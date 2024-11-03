
/* add comma in rupees */
export const addCommas = (amount) => {
    return amount >= 10000 ? amount.toLocaleString() : amount;
}

/* calculate sale price */
export const saleCalc = (price, onSale, discount) =>{
  if(onSale){
        const salePrice = price - (price * discount) / 100;      
        return salePrice;
  }  
  else {
    return price;
  }  
}

/* calculate sale price */
export const dollar_Conv = (price, sale) =>{
    const dollar = (price / 277.90).toFixed(2);
    return dollar;
}

  // Utility function to convert URL path to a title
export const formatTitle = (path) => {
    if (path === "/") return "Home";
    
    // Remove leading slash and split into words, capitalize each word
    return path
      .replace("/", "")       // Remove leading slash
      .split("-")             // Split by hyphen (if any)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize
      .join(" ");             // Join words with space
      
};

// Helper function to calculate the difference
export const calculateDateDifference = (createdAt) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const diffTime = Math.abs(currentDate - createdDate);

  // Calculate months and days from the difference
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const remainingDays = diffDays % 30;

  const output = diffMonths > 0 
  ? `${diffMonths} months ${remainingDays} days old account` 
  : remainingDays === 0 
    ? 'Account created today' 
    : `${remainingDays} days old account`;

  return output;

}