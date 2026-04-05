import logging
import requests
from src.core import settings
from typing import Optional, Any, Dict

ORG = settings.ASGARDIO_ORG
CLIENT_ID = settings.CLIENT_ID
CLIENT_SECRET = settings.CLIENT_SECRET

logger = logging.getLogger(__name__)

class AuthService:
    def introspect_token(self, token: str) -> Optional[Dict[str, Any]]:
        url = f'https://api.asgardeo.io/t/{ORG}/oauth2/introspect'
        data = {'token': token, 'token_type_hint': 'access_token'}
        auth = (CLIENT_ID, CLIENT_SECRET)
        
        try:
            res = requests.post(url, data=data, auth=auth)
            res.raise_for_status()
            res_data = res.json()
            
            if res_data.get("active", False):
                return res_data
            
            logger.warning("Token introspection returned inactive token")
            return None
        except Exception as e:
            logger.error(f"Error during token introspection: {str(e)}")
            return None

    def get_user_info(self, token: str) -> Optional[Dict[str, Any]]:
        url = f'https://api.asgardeo.io/t/{ORG}/oauth2/userinfo'
        headers = {'Authorization': f'Bearer {token}'}
        
        try:
            res = requests.get(url, headers=headers)
            res.raise_for_status()
            return res.json()
        except Exception as e:
            logger.error(f"Error fetching user info: {str(e)}")
            return None



