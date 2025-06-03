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
        "#f97316", // orange
        "#6366f1", // indigo
        "#22c55e", // green
        "#a855f7", // purple
        "#f43f5e", // rose
        "#06b6d4", // cyan
        "#eab308", // yellow
        "#8b5cf6", // amethyst
        "#84cc16"  // lime
    ];
    const index = id
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
};
