import { Logger, SymptomsURL } from '../../api/common';
import { httpService } from '../../api/services';
import store from '../store';
import { symptomsAction } from './symptoms.slice';

class SymptomsService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new SymptomsService();
    }

    return this.instance;
  }

  async getNews() {
    try {
      const url = `${SymptomsURL}`;
      const res = await httpService.get(url, null);
      if (res.success) {
        store.dispatch(
          symptomsAction.getSymptoms({
            symptoms: res.data.keywords,
          })
        );
      }
      return [];
    } catch (error) {
      Logger.Error(error.message);
    }
  }
}

export const symptomsService = SymptomsService.getInstance();
