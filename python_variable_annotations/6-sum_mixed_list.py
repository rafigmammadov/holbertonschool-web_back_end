#!/usr/bin/env python3
"""
Module that contains sum_mixed_list function.
"""
from typing import List


def sum_mixed_list(mxd_lst: List[int, float]) -> float:
    """
    Function that takes a list mxd_lst of integers
    and floats and returns their sum as a float.
    """
    return sum(mxd_lst)
