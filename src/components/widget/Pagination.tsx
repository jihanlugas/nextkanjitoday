import React from 'react'
import { NextPage } from 'next';
import { CgChevronLeft, CgPushChevronLeft, CgChevronRight, CgPushChevronRight } from 'react-icons/cg'
import styles from "./gridpaginaion.module.scss";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// interface Grid{
//     children: React.ReactNode
// }


const GridView = (paginate, setPaginate) => {
    const gridPage: {
        grid?: any,
        data?: any,
        paginate?: any,
        loading?: any,
    } = {};

    gridPage.grid = ({ children }) => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
                {children}
            </div>
        )
    }

    gridPage.data = ({ children, ...props }) => {
        return (
            <div className={"bg-gray-300 p-2 rounded"} {...props}>
                {children}
            </div>
        )
    }

    gridPage.paginate = ({ data }) => {

        const first = () => {
            if (data.currentPage !== 1) {
                setPaginate({ ...paginate, page: 1 })
            }
        }

        const pref = () => {
            if (data.currentPage !== 1) {
                setPaginate({ ...paginate, page: data.currentPage - 1 })
            }
        }

        const next = () => {
            if (data.currentPage !== data.lastPage) {
                setPaginate({ ...paginate, page: data.currentPage + 1 })
            }
        }

        const last = () => {
            if (data.currentPage !== data.lastPage) {
                setPaginate({ ...paginate, page: data.lastPage })
            }
        }

        const perPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setPaginate({ ...paginate, perPage: parseInt(event.target.value) })
        }

        console.log("data => ", data)

        if (data.data && data.data.length > 0) {
            return (
                <div className={"flex flex-row justify-between items-center"}>

                    <div className={"flex flex-row items-center"}>
                        <div className={""}>
                            Per Page
                        </div>
                        <div className={""}>
                            <select className={"p-2 w-16 rounded bg-transparent"} name="" id="" onChange={perPage}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                    {data.lastPage !== 1 && (
                        <div className={"flex flex-row"}>
                            <div className={data.currentPage <= 1 ? [styles.pageaction, styles.disable].join(" ") : [styles.pageaction].join(" ")} onClick={first}>
                                <CgPushChevronLeft size={"1.5em"} />
                            </div>
                            <div className={data.currentPage <= 1 ? [styles.pageaction, styles.disable].join(" ") : [styles.pageaction].join(" ")} onClick={pref}>
                                <CgChevronLeft size={"1.5em"} />
                            </div>
                            <div className={styles.pageaction}>
                                <span>{data.currentPage}</span>
                            </div>
                            <div className={data.currentPage === data.lastPage ? [styles.pageaction, styles.disable].join(" ") : [styles.pageaction].join(" ")} onClick={next}>
                                <CgChevronRight size={"1.5em"} />
                            </div>
                            <div className={data.currentPage === data.lastPage ? [styles.pageaction, styles.disable].join(" ") : [styles.pageaction].join(" ")} onClick={last}>
                                <CgPushChevronRight size={"1.5em"} />
                            </div>
                        </div>
                    )}

                </div>
            )
        } else {
            return (
                <div className={"flex justify-center my-4"}>
                    <span className={"text-xl"}>No data, Let's create one</span>
                </div>
            )
        }
    }


    gridPage.loading = () => {
        return (
            <SkeletonTheme color="rgba(156, 163, 175, 1)" highlightColor="rgba(229, 231, 235, 1)">
                <Skeleton className={"h-16"} />
            </SkeletonTheme>
        )
    }

    return gridPage
}

export { GridView }