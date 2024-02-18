function formatDateToDDMMYYYY(date) {
    const day = date.getDate().toString().padStart(2, '0'); // Adds leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adds leading zero; +1 because months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}