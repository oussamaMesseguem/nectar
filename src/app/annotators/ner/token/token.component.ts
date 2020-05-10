import { Component, OnInit, Input } from '@angular/core';
import { NerToken, NER_TAG_COLOR } from '../ner.model';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  @Input() token: NerToken;

  /**
   * The color changes when type and tag are selected
   */
  labelColor: string;

  constructor() { }


  ngOnInit(): void {
    if (this.displayInput) {
      this.labelColor = NER_TAG_COLOR[this.token.label.split('-')[1]];
    }
  }

  /**
   * Should display input rather than button
   * When: there is a label different to O.
   */
  get displayInput() {
    return this.token.label && this.token.label !== 'O';
  }

  /**
   * Once the tag has been added to a token, parent notifies self.
   * The value doesn't matter as the setter is used to update the view.
   */
  @Input() set update(b: boolean) {
    if (this.displayInput) {
      this.labelColor = NER_TAG_COLOR[this.token.label.split('-')[1]];
    }
  }

}
