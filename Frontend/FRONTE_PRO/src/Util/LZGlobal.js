import {DecodeToken} from '../Util/DecodeToken'
import {GetBase64ByImage} from '../Util/GetBase64ByImage'
import {translateBy,ShowSnackbar,ConvertMnToHour,GetURLPreviewIframe} from '../Util/globalUtils'
import NoData from '../../public/Icon/no-data.svg';
import DefaultImage from '../../public/Image/DefaultImage/default.jpg';
import ComingSoon from '../../public/Image/DefaultImage/comming.jpg';
export default  {
    DecodeToken : DecodeToken,
    GetBase64ByImage : GetBase64ByImage,
    translate : translateBy,
    snackbar : ShowSnackbar,
    convertTime : ConvertMnToHour,
    NodataImage :NoData,
    DefaultImage:DefaultImage,
    ComingSoon : ComingSoon,
    GetURLPreviewIframe:GetURLPreviewIframe,
}