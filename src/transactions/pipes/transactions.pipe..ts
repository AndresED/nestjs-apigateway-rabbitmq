import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ValidateTransactionsFiltersPipeDto } from '../../transactions/dto/create-transaction.dto';
@Injectable()
export class ValidateTransactionFiltersPipe implements PipeTransform {
    transform(qs: ValidateTransactionsFiltersPipeDto, metadata: ArgumentMetadata) {
        const toReturn: any = {}
        if (qs.transactionStatus != null && qs.transactionStatus != undefined && qs.transactionStatus != 'null' && qs.transactionStatus != 'undefined') {
            toReturn.transactionStatus = qs.transactionStatus
        } else {
            toReturn.transactionStatus = null;
        }
        if (qs.userId != null && qs.userId != undefined && qs.userId != 'null' && qs.userId != 'undefined') {
            toReturn.userId = qs.userId
        } else {
            toReturn.userId = null;
        }
        toReturn.limit = parseInt(qs.limit+'');
        toReturn.page = parseInt(qs.page+'');
        return toReturn;
    }
}
