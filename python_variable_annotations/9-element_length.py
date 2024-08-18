#!/usr/bin/env python3
"""
Module that contains element_length function.
"""
from typing import Iterable, Sequence, List, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
    Function that takes iterable as argument and returns list of tuple
    that contains sequence and integer.
    """
    return [(i, len(i)) for i in lst]
