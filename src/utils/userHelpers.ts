export const getInitials = (firstName: string, secondName: string): string => {
    const firstInitial = firstName?.charAt(0).toUpperCase() || '';
    const secondInitial = secondName?.charAt(0).toUpperCase() || firstName?.charAt(1).toUpperCase();
    return `${firstInitial}${secondInitial}`;
};

export const getRandomColor = (id: string): string => {
    const colors = [
        "#f59e0b", // amber
        "#10b981", // emerald
        "#3b82f6", // blue
        "#8b5cf6", // violet
        "#ec4899", // pink
        "#ef4444", // red
        "#14b8a6", // teal
    ];
    const index = id
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
};
