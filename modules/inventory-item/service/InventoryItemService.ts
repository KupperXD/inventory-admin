import { InventoryItemTypes } from '~/modules/common/enums/InventoryItemTypes';
import type { InventoryItem } from '~/modules/common/types/inventoryItem';

class InventoryItemService {
    public getTypeTextByTypeValue(type: InventoryItemTypes): string {
        switch (type) {
            case InventoryItemTypes.COMPUTER:
                return 'Компьютер';
            case InventoryItemTypes.FURNITURE:
                return 'Мебель';
            case InventoryItemTypes.PERIPHERY:
                return 'Переферия';
            default:
                return '';
        }
    }

    public transformTableRowsByModel(
        model: InventoryItem.TItemModel
    ): Record<string, string> {
        return {
            id: model.id,
            employeeName: model.employee.name,
            number: model.number,
            type: this.getTypeTextByTypeValue(model.type) || '-',
        };
    }
}

const inventoryItemService = new InventoryItemService();

export default inventoryItemService;
