const statusColors = new Map([
    ["pending", "yellow"],  // Indicates tasks that need attention
    ["completed", "green"],  // Indicates tasks that are done
    ["overdue", "red"],  // Indicates tasks that are overdue
    ["removed", "gray"],  // Indicates tasks that are removed
]);

export default statusColors;