#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
        Method that implements if between two queries, certain rows
        are removed from the dataset, the user does not miss items
        from dataset when changing page.
        """
        indexed_data = self.indexed_dataset()
        key_list = list(indexed_data.keys())

        assert index < len(key_list)
        assert index + page_size <= len(key_list)

        if index not in indexed_data:
            start_key = key_list[index]
        else:
            start_key = index

        paginated_data = []
        for i in range(index, index + page_size):
            key = key_list[i]
            paginated_data.append(indexed_data[key])

        next_index = index + page_size
        if next_index < len(key_list):
            next_index = key_list[next_index]
        else:
            next_index = None

        return {
            'index': index,
            'next_index': next_index,
            'page_size': len(paginated_data),
            'data': paginated_data
        }
