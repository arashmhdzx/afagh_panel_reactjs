import { Table } from "rsuite";
import * as T from "../../styles/components/display/table.module.scss";

const { Column, HeaderCell, Cell } = Table;

const Step4 = (props) => {
    const { Solver } = props ?? [];
    function modalHandler(){
        Solver.Page.modal({
            header:"افزودن جلسه جدید",
            body:(
                <div className="">

                </div>
            )
        })
    }

    const headerData = [
        { title: "#", type: "id" },
        { title: "عنوان جلسه", type: "title", align: "right" },
        { title: "تاریخ ایجاد", key: "created_at", type: "date" },
        { title: "ضبط", type: "record" },
        { title: "شروع ضبط اتوماتیک", type: "start_auto_record" },
        { title: "مهمان", type: "guest" },
        { title: "وضعیت", type: "status" },
        {
            title: "عملیات ها",
            type: "actions",
            actions: [
                { key: "edit" },
                { key: "delete", url: "courses" },
            ],
        },
    ];
    return (
        <div className="rs-flex-col">
            <div className="rs-flex-end">
                <button className="rs-btn-ghost rs-btn-red custom-btn" onClick={()=>modalHandler()} >افزودن جلسه</button>
            </div>
            <Table virtualized data={[{ id: 1, title: "1", date: "2", record: "shit", start_auto_record: "fuck", guest: "oh yea", status: "off" }]} >
                {
                    headerData.map((el, index) => (
                        <Column width={120} align="center" fixed>
                            <HeaderCell>{el.title}</HeaderCell>
                            <Cell dataKey={el.type} />
                        </Column>
                    ))
                }
            </Table>
        </div>
    )
}

export default Step4