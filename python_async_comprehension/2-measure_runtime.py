#!/usr/bin/env python3
"""
Module that contains the coroutine measure_runtime
"""
import asyncio
from typing import List
import time

async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """
    Function or coroutine that will execute async_comprehension four times in
    parallel using asyncio.gather.
    measure_runtime should measure the total runtime and return it.
    """
    all_tasks = [async_comprehension for i in range(4)]
    start = time.perf_counter()
    await asyncio.gather(*all_tasks)
    end = time.perf_counter()

    return end - start
