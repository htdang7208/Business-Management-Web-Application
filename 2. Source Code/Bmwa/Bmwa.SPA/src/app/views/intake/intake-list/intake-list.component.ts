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
  intakeForAdd: Intake = {} as Intake;
  intakeForEdit: Intake = {} as Intake;
  intakeForRemove: Intake = {} as Intake;
  modalAddRef: BsModalRef;
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

  addIntake() {
    console.log('start to add');
    this.intakeService.addIntake(this.intakeForAdd).subscribe(
      response => {
        this.alertify.success('Add new successfully!');
        this.loadIntakes();
        console.log('this.intakes: ', this.intakes);
      }, error => {
        this.alertify.error(error);
      }
    );
    this.modalAddRef.hide();
  }

  updateIntake() {
    this.intakeService
      .updateIntake(this.intakeForEdit.id, this.intakeForEdit)
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

  openAddModal(template: TemplateRef<any>) {
    this.modalAddRef = this.modalService.show(template);
  }

  openEditModal(template: TemplateRef<any>, intake: Intake) {
    this.intakeForEdit = intake;
    this.modalEditRef = this.modalService.show(template);
  }

  openRemoveModal(template: TemplateRef<any>, intake: Intake) {
    this.intakeForRemove = intake;
    this.modalRemoveRef = this.modalService.show(template, {
      class: 'modal-sm'
    });
  }

  confirm(): void {
    this.modalRemoveRef.hide();
  }

  decline(): void {
    this.modalRemoveRef.hide();
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
}
