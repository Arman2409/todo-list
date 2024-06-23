import ListIcon from "@ant-design/icons/lib/icons/UnorderedListOutlined"
import TrashIcon from "@ant-design/icons/lib/icons/DeleteOutlined";

import type { PageData } from "../../../../../types/common";

const pagesData: Map<string, PageData> = new Map([
    ['/', { title: 'Todo List', icon: <ListIcon /> }],
    ['/trash', { title: 'Trash', icon: <TrashIcon />}],
]);

export default pagesData;