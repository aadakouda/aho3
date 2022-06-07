from fastapi import FastAPI
from fastapi import Query

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)


def check_aho(number):
    """
    アホかどうかチェックする関数
    """
    return number%3 == 0 or '3' in str(number)


def next_number(number):
    """
    つぎの数字を返す関数
    """
    return number+1 if number < 40 else 1


@app.get('/')
async def aho3(number: int = Query(default=1, ge=1, le=40)):
    """
    3の倍数と3がつく数字のときアホになるAPI
    """
    response_json = {
        'number': number,
        'aho': check_aho(number),
        'next_number': next_number(number),
    }
    return response_json
