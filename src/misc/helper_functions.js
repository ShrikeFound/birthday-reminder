export const getNextBirthday = (birthdayObj) => {
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();
    const nextMonth = birthdayObj.birthmonth
    const nextDay = birthdayObj.birthday
  let nextBDay = new Date();
  console.log(birthdayObj.name)
    console.log(todayMonth,nextMonth, todayMonth < nextMonth)
  if (todayMonth < nextMonth) {
      nextBDay = new Date(today.getFullYear(),birthdayObj.birthmonth,birthdayObj.birthday)
    } else if (todayDay > nextDay) {
    nextBDay = new Date(today.getFullYear() + 1, birthdayObj.birthmonth, birthdayObj.birthday)
    } else {
    nextBDay = new Date(today.getFullYear()+1, birthdayObj.birthmonth, birthdayObj.birthday)
    }
    
    return nextBDay
  }


  export const getAge = (targetDateString,birthDateString) => {
  const today = new Date(targetDateString)
    const birthDate = new Date(birthDateString)
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
  const month = today.getUTCMonth() - birthDate.getUTCMonth()
  if (month < 0 || (month === 0 && today.getUTCDate() < birthDate.getUTCDate())) {
    age--
  }
  return age
}



export const getMonthNameFromDate = (monthNum) =>{
  const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthName = months[monthNum]
  return monthName

}