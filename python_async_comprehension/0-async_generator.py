#!/usr/bin/env python3
"""
Module that contains the coroutine async_generator
"""
import asyncio
from typing import Generator
import random

async def async_generator() -> Generator[float, None, None]: #noqa
    """
    Function or coroutine that will loop 10 times, each time
    asynchronously wait 1 second, then yield a random number
    between 0 and 10. Use the random module.
    """
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)


if __name__ == "__main__":

    async def print_yielded_values():
        result = []
        async for i in async_generator():
            result.append(i)
        print(result)

    asyncio.run(print_yielded_values())
