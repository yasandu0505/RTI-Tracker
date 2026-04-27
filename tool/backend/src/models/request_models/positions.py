from pydantic import BaseModel, Field, ConfigDict

class PositionRequest(BaseModel):
    model_config = ConfigDict(from_attributes=True, str_strip_whitespace=True)
    # attributes
    name: str = Field(..., json_schema_extra={"example":"Minister"}, description="Name of the position.")

# PositionRequest:
#   type: object
#   required:
#     - name
#   properties:
#     name:
#       type: string
#       example: Minister
#       description: Human-readable position name