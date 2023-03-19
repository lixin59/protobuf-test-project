import { request } from '@/adaptors/request';

/**
 * 获取测试
 * @returns
 */
export const getTest = () => {
  return request({
    url: '/getTest'
  });
};
