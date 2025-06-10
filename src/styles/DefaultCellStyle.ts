import { CellStyle } from '../types/interfaces/styles';
import { HorizontalAlignment, VerticalAlignment } from '../types/enums/alignment';

export class DefaultCellStyle implements CellStyle {
    fontFamily = 'Calibri';
    fontSize = 10;
    fontColor = '#000000';
    isBold = false;
    isItalic = false;
    isUnderline = false;
    backgroundColor = '#FFFFFF';
    horizontalAlignment = HorizontalAlignment.Left;
    verticalAlignment = VerticalAlignment.Center;
    isWrapped = false;
    isMerged = false;
    rowSpan = 1;
    columnSpan = 1;
}
