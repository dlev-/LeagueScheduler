class DateUtils {
	public static niceStringForDate(d:Date) : string{
		return d.toISOString().slice(0,10);
	}
}	


export default DateUtils;