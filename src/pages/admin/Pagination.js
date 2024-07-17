import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const pages = [...Array(totalPages).keys()].map((num) => num + 1);

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <nav className='float-right'>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                </li>
                {pages.map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => goToPage(page)}>
                            {page}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;