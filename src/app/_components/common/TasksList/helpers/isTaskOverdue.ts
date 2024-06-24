const isTaskOverdue = (deadline:Date): boolean => {
    const currentDate = new Date();
    return new Date(deadline) < currentDate;
}

export default isTaskOverdue;