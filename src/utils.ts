function endDefinition(value: number) {
    if (value === 1 || value === 21) return `${value} час `;
    else if (
        value === 2 ||
        value === 3 ||
        value === 4 ||
        value === 22 ||
        value === 23 ||
        value === 24
    )
        return `${value} часа`;
    else return `${value} часов`;
}

export function getDate(date: string) {
    const millisecondsInHour = 3600000;
    const currentDate = new Date().getTime();
    const commentDate = new Date(date).getTime();
    const hoursDifference = Math.round(
        (currentDate - commentDate) / millisecondsInHour,
    );
    if (hoursDifference <= 24) {
        return `${endDefinition(hoursDifference)} назад`;
    } else {
        return new Date(date).toLocaleString(undefined, {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    }
}
