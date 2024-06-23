const generateUniqueId = () => {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).slice(2, 9);
    return timestamp + randomString;
}

export default generateUniqueId;