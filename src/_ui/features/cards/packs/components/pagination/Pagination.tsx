import React from 'react';
import classnames from 'classnames';
import {usePagination, DOTS} from './usePagination';
import './pagination.scss';

type PaginationPropsType = {
    onPageChange: (page: number | string) => void
    totalCount: number
    siblingCount: number
    currentPage: number
    pageSize: number
    className: string
}


export const Pagination: React.FC<PaginationPropsType> = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || Array.isArray(paginationRange) && paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = Array.isArray(paginationRange) && paginationRange[paginationRange.length - 1];
    return (
        <ul
            className={classnames('pagination-container', {[className]: className})}
        >
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === 1
                })}
                onClick={onPrevious}
            >
                <div className="arrow left"/>
            </li>
            {Array.isArray(paginationRange) && paginationRange.map(pageNumber => {
                if (pageNumber === DOTS) {
                    return <li className="pagination-item dots">&#8230;</li>;
                }

                return (
                    <li
                        className={classnames('pagination-item', {
                            selected: pageNumber === currentPage
                        })}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === lastPage
                })}
                onClick={onNext}
            >
                <div className="arrow right"/>
            </li>
        </ul>
    );
};

