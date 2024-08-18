#!/usr/bin/env python3
"""
Module that contains asynchronous wait_n function.
"""
from typing import List
import asyncio
wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """
    Function that takes in 2 int
    arguments (in this order): n and max_delay. You will
    spawn wait_random n times with the specified max_delay.
    """
    delay: List[float] = []
    delays: List[float] = []
    for _ in range(n):
        delay.append(wait_random(max_delay))
    for delay in asyncio.as_completed(delay):
        min_result = await delay
        delays.append(min_result)
    return delays
