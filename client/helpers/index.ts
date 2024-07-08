export function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
export const getFormattedTime = (date:string|Date)=>{
    return new Intl.DateTimeFormat('en-US',{ year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(date))
}



  