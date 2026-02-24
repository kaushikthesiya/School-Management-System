export const formatTimeTo12Hour = (time) => {
    if (!time) return '--:--';
    try {
        const [hours, minutes] = time.split(':');
        let h = parseInt(hours);
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        return `${h.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    } catch (error) {
        return time || '--:--';
    }
};
