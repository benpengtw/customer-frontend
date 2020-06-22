import ReactGA from 'react-ga'

export class GAtools {
  public setPage(page: any): any {
    ReactGA.pageview(page)
  }
  public initGA() {
    ReactGA.initialize('UA-170164679-1') // put your tracking id here
  }
}
