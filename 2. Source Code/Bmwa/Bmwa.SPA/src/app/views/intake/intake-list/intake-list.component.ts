import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Intake } from 'src/app/_models/intake';
import { IntakeService } from 'src/app/_services/intake.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-intake-list',
  templateUrl: './intake-list.component.html',
  styleUrls: ['./intake-list.component.css']
})
export class IntakeListComponent implements OnInit {
  intakes: Intake[];
  intakeFromDOM: Intake;
  nameFromDOM: string;
  idFromDOM: number;
  modalEditRef: BsModalRef;
  modalRemoveRef: BsModalRef;

  constructor(
    private route: ActivatedRoute,
    private intakeService: IntakeService,
    private modalService: BsModalService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loadIntakes();
  }

  loadIntakes() {
    this.route.data.subscribe(data => {
      this.intakes = data['intakes'];
    });
  }
  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  openEditModal(template: TemplateRef<any>, intake: Intake) {
    this.intakeFromDOM = intake;
    this.modalEditRef = this.modalService.show(template);
  }

  openRemoveModal(template: TemplateRef<any>, name: string, id: number) {
    this.nameFromDOM = name;
    this.idFromDOM = id;
    this.modalRemoveRef = this.modalService.show(template, {
      class: 'modal-sm'
    });
    console.log('id: ', id);
  }

  confirm(): void {
    this.modalRemoveRef.hide();
  }

  decline(): void {
    this.modalRemoveRef.hide();
  }

  updateIntake(f: NgForm) {
    this.intakeService
      .updateIntake(this.idFromDOM, this.intakeFromDOM)
      .subscribe(
        response => {
          this.alertify.success('Update successfully!');
        },
        error => {
          this.alertify.error(error);
        }
      );
    this.modalEditRef.hide();
  }
}
