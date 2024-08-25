#!/usr/bin/env python3
"""
Module that contains Server class and
implemented get_page method.
"""
import csv
import math
from typing import List, Tuple, Dict, Any


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Function that should return a tuple of size two containing
    a start index and an end index corresponding to the range of indexes
    to return in a list for those particular pagination parameters.
    """
    start_index = page_size * (page - 1)
    end_page = start_index + page_size

    return (start_index, end_page)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Method that takes two integer arguments
        page with default value 1 and page_size with default value 10.
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        dataset = self.dataset()
        start_index, end_index = index_range(page, page_size)

        if start_index >= len(dataset):
            return []

        return dataset[start_index:end_index]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """
        Function that takes the same arguments (and defaults) as get_page
        and returns a dictionary containing the following key-value pairs
        """
        data = []
        try:
            data = self.get_page(page, page_size)
        except AssertionError:
            return {}

        dataset: List = self.dataset()
        total_page: int = math.ceil(len(dataset) / page_size) if dataset else 0
        next_page = (page + 1) if (page + 1) else None
        previous_page = (page - 1) if (page - 1) else None

        dictionary: Dict[str, Any] = {
            'page_size': page_size,
            'page': page,
            'data': data,
            'next_page': next_page,
            'prev_page': previous_page,
            'total_pages': total_page,
        }

        return dictionary
