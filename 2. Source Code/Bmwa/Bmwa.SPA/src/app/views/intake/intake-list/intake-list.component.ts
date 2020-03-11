import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Intake } from 'src/app/_models/intake';
import { IntakeService } from 'src/app/_services/intake.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-intake-list',
  templateUrl: './intake-list.component.html',
  styleUrls: ['./intake-list.component.css']
})
export class IntakeListComponent implements OnInit {
  intakes: Intake[];
  editIntake: Intake;
  whichIntake: string;
  whichIntakeId: number;
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
    this.route.data.subscribe(data => {
      this.intakes = data['intakes'];
    });
  }

  openEditModal(template: TemplateRef<any>, id: number) {
    this.intakeService.getIntake(id).subscribe(
      (data: Intake) => {
        this.editIntake = data;
      },
      error => {
        this.alertify.error(error);
      }
    );
    this.whichIntakeId = id;
    this.modalEditRef = this.modalService.show(template);
  }

  openRemoveModal(template: TemplateRef<any>, name: string, id: number) {
    this.whichIntake = name;
    this.whichIntakeId = id;
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

  updateIntake() {
    this.intakeService
      .updateIntake(this.whichIntakeId, this.editIntake)
      .subscribe(
        response => {
          this.alertify.success('Update successfully!');
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }
}
