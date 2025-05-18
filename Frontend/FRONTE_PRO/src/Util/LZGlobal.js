import {DecodeToken} from '../Util/DecodeToken'
import {GetBase64ByImage} from '../Util/GetBase64ByImage'
import {translateBy,ShowSnackbar,ConvertMnToHour} from '../Util/globalUtils'
import NoData from '../../public/Icon/no-data.svg';
export default  {
    DecodeToken : DecodeToken,
    GetBase64ByImage : GetBase64ByImage,
    translate : translateBy,
    snackbar : ShowSnackbar,
    convertTime : ConvertMnToHour,
    NodataImage :NoData
}