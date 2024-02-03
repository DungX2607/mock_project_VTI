export type MyPaginationProps = {
    currentPage: number|1;
    totalPages: number|1;
    onPageChange: (pageNumber: number) => void;
}