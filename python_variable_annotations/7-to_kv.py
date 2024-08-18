#!/usr/bin/env python3
"""
Module that contains to_kv function.
"""
from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """
    Function that takes a string k and an int OR float v
    as arguments and returns a tuple. The first element of the tuple is
    the string k.
    The second element is the square of
    the int/float v and should be annotated as a float.
    """
    return k, float(pow(v, 2))
