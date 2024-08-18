#!/usr/bin/env python3
"""
Module that contains asynchronous task_wait_n function.
"""
from typing import List
import asyncio
task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """
    Function that executes wait_random n times in max_delay seconds.
    """
    delay: List[float] = []
    delays: List[float] = []

    for _ in range(n):
        delay.append(task_wait_random(max_delay))

    for i in asyncio.as_completed(delay):
        min_result = await i
        delays.append(min_result)

    return delays
