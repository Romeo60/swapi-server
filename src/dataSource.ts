import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'

const API_URL = 'https://swapi.dev/api/' 

export class StarWarsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = API_URL
  }  

  async person(search: string) {
    const data = await this.get('people', { search:search })
    return data
  }

  async people(page: number) {
    const data = await this.get('people', { page:page })
    return data
  }

}

export const dataSources = () => ({ StarWarsAPI: new StarWarsAPI() })