const pythonInit = `
import sys
import pyodide
import json
import pydantic
from munch import DefaultMunch
import micropip
import cryptography
import ssl

await micropip.install('${process.env.PUBLIC_URL}/static/cryptosat-python-sdk/dist/cryptosat_python_sdk-0.1.0-py3-none-any.whl')

# Import Cryptosat client
from cryptosat.client import CryptosatClient

# patch request with pyodide_http
import pyodide_http
pyodide_http.patch_all()

# monkeypatch pydantic for fake 2.x compatibility
def new_model_validate(d):
    obj = DefaultMunch.fromDict(d)
    return obj

def new_model_dump(d):
	return d.__dict__

pydantic.BaseModel.model_validate = new_model_validate
pydantic.BaseModel.model_dump = new_model_dump

# Import Cryptosat client
cryptosat = CryptosatClient('https://sandbox.api.cryptosat.io/v0')
`;

export default pythonInit;
