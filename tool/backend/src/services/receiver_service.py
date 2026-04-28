import logging
from src.models import Receiver, PaginationModel
from src.models.response_models import ReceiverListResponse, ReceiverResponse
from src.core import InternalServerException
from sqlmodel import Session, select, func
from sqlalchemy.orm import selectinload

logger = logging.getLogger(__name__)

class ReceiverService:
    """
    This service is responsible for executing all receiver operations.
    """

    def __init__(self, session: Session):
        self.session = session

    # API
    def get_receivers(
        self,
        *,
        page: int = 1,
        page_size: int = 10
    ) -> ReceiverListResponse:
        try:
            offset = (page - 1) * page_size

            # fetch the records from the table
            statement_records = (
                select(Receiver)
                .options(selectinload(Receiver.position), selectinload(Receiver.institution))
                .order_by(Receiver.created_at.desc())
                .offset(offset)
                .limit(page_size)
            )
            results = self.session.exec(statement_records).all()
            
            # fetch the total record count
            statement_count = select(func.count()).select_from(Receiver)
            total_items = self.session.exec(statement_count).one()

            # pagination response
            pagination = PaginationModel(
                page=page,
                pageSize=page_size,
                totalItem=total_items,
                totalPages=(total_items + page_size - 1) // page_size if total_items > 0 else 0
            )
            
            # return the final response
            return ReceiverListResponse(
                data=[ReceiverResponse.model_validate(r) for r in results],
                pagination=pagination
            )
        except Exception as e:
            logger.error(f"[RECEIVER SERVICE] Error fetching Receivers: {e}")
            raise InternalServerException("Failed to fetch Receivers from database.") from e