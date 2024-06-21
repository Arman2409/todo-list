import ListIcon from "@ant-design/icons/lib/icons/UnorderedListOutlined"
import TrashIcon from "@ant-design/icons/lib/icons/DeleteOutlined";

const pagesData = new Map([
    ['/', { title: 'Todo List', icon: <ListIcon /> }],
    ['/trash', { title: 'Trash', icon: <TrashIcon />}],
]);

export default pagesData;