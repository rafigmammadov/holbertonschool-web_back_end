#!/usr/bin/env python3
"""
Module that contains safe_first_element function.
"""
from typing import Sequence, Any, Optional


def safe_first_element(lst: Sequence[Any]) -> Optional[Any]:
    """
    Function that does something ahahaha
    """
    if lst:
        return lst[0]
    else:
        return None
