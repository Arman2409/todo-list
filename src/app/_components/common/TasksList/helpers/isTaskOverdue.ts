const isTaskOverdue = (deadline:Date) => {
    const currentDate = new Date();
    return new Date(deadline) < currentDate;
}

export default isTaskOverdue;