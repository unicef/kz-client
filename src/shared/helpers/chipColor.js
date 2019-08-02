/**
 *  get chip color based on company status
 *
 *
 */
export const chipColor = function (companyStatus) { // eslint-disable-line
    let color = 'error';
    switch (companyStatus) {
      case 'trusted':
        color = 'success';
        break;
      case 'filled':
        color = 'info';
        break;
      case 'new':
        color = 'error';
        break;
      case 'rejected':
        color = 'error';
        break;
      default:
        color = 'error';
    }
    return color;
};
