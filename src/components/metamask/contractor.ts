import { api } from 'src/components/axios/axios.component';
import { store } from 'src/store/store';
import { Wildapter } from './adaptor';
export const Contractor = {
  getNounce: (address: string): Promise<string> => api.post('/contractor/nounce', { address }),
  sign: async (nounce: string) => await Wildapter.sign(nounce),
  header: async () => {
    const nounce = await Contractor.getNounce(store.getState().metamask.walletAddress);
    const signature = (await Contractor.sign(nounce)) as string;
    return { headers: { signature } };
  },
};
