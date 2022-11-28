import { TEmployeeItem } from '~/modules/common/types';
import { Form } from '~/modules/form/types';

export default class EmployeeService {

    /**
     * Трансформировать модель сотрудника в option селекта
     * @param model
     */
    static transformModelToOption(model: TEmployeeItem): Form.TOption {
        return {
            label: model.name,
            value: model.id.toString(),
        };
    }
}
