const getNextDay = (currentDate: Date): Date => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
}

export default getNextDay;