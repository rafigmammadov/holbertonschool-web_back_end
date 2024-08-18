#!/usr/bin/env python3
"""
Module that contains asynchronous measure_time function.
"""
import time
import asyncio
wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """
    Function that takes in 2 int
    arguments (in this order): n and max_delay. You will
    spawn wait_random n times with the specified max_delay.
    """
    start = time.time()
    asyncio.run(wait_n(n, max_delay))
    finish = time.time()
    total_time = finish - start
    return total_time / n
