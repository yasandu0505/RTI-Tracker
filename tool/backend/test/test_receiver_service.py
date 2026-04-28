import pytest
from sqlalchemy.exc import OperationalError
from src.services.receiver_service import ReceiverService
from src.models.response_models import ReceiverListResponse
from src.core.exceptions import InternalServerException
from sqlmodel import SQLModel, Session, create_engine

def test_get_receivers_default(receiver_db):
    """Test fetching receivers with default pagination (page 1, size 10)."""
    service = ReceiverService(session=receiver_db)
    response = service.get_receivers()
    
    assert isinstance(response, ReceiverListResponse)
    assert response.pagination.page == 1
    assert response.pagination.pageSize == 10
    assert response.pagination.totalItem == 3
    assert response.pagination.totalPages == 1
    assert len(response.data) == 3
    # verify sorting order (descending by created_at)
    # Receiver 3 (now) should be first, Receiver 1 (now - 2h) should be last
    assert response.data[0].email == "receiver3@example.com"
    assert response.data[1].email == "receiver2@example.com"
    assert response.data[2].email == "receiver1@example.com"

    # Verify eager loading relationships
    assert response.data[0].position is not None
    assert response.data[0].institution is not None

def test_get_receivers_custom_pagination(receiver_db):
    """Test fetching receivers with custom page and page size."""
    service = ReceiverService(session=receiver_db)
    response = service.get_receivers(page=2, page_size=2)
    
    assert response.pagination.page == 2
    assert response.pagination.pageSize == 2
    assert response.pagination.totalItem == 3
    assert response.pagination.totalPages == 2
    assert len(response.data) == 1  # Only 1 record left for page 2
    assert response.data[0].email == "receiver1@example.com"

def test_get_receivers_empty_db():
    """Test behavior when no receivers exist in the database."""
    engine = create_engine("sqlite:///:memory:")
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        service = ReceiverService(session=session)
        response = service.get_receivers()
        
        assert response.pagination.totalItem == 0
        assert response.pagination.totalPages == 0
        assert response.data == []

def test_get_receivers_db_error(monkeypatch, receiver_db):
    """Test that InternalServerException is raised when a database error occurs."""
    service = ReceiverService(session=receiver_db)
    
    # Mock the session to raise an error during execution
    def mock_exec(*args, **kwargs):
        raise OperationalError("Fake DB error", None, None)
    
    monkeypatch.setattr(receiver_db, "exec", mock_exec)
    
    with pytest.raises(InternalServerException) as excinfo:
        service.get_receivers()
    
    assert "Failed to fetch Receivers from database" in str(excinfo.value)
