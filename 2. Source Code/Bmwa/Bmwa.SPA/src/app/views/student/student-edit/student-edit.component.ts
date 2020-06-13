import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from 'src/app/_models/student';
import { StudentService } from 'src/app/_services/student.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  @Input() student: Student;
  @Input() currentPage: number;
  @Output() currentPageEmitter = new EventEmitter<number>();
  @Output() closeEmitter = new EventEmitter();

  statusList = [
    { value: 0, display: 'Failed' },
    { value: 1, display: 'Passed' },
    { value: 2, display: 'Not attend' }
  ];
  studentForm: FormGroup;
  photoUrl: string;
  selectedFile: File = null;
  notWait = true;
  constructor(private studentService: StudentService,
              private alertify: AlertifyService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: [this.student.name, Validators.required],
      identityNumber: [this.student.identityNumber, Validators.required],
      interviewTime: [this.student.interviewTime, Validators.required],
      status: [this.student.status],
      remark: [this.student.remark],
      phone: [this.student.phone, Validators.required],
      email: [this.student.email, Validators.required],
      address: [this.student.address, Validators.required]
    });
    this.photoUrl = this.student.photoUrl;
  }

  submit() {
    // convert to formData - because form contain "File"
    const fd = new FormData();
    fd.append('name', this.studentForm.value.name);
    fd.append('identityNumber', this.studentForm.value.identityNumber);
    fd.append('interviewTime', this.studentForm.value.interviewTime);
    fd.append('status', this.studentForm.value.status);
    fd.append('remark', this.studentForm.value.remark);
    fd.append('phone', this.studentForm.value.phone);
    fd.append('email', this.studentForm.value.email);
    fd.append('address', this.studentForm.value.address);
    if (this.selectedFile != null) {
      fd.append('photo', this.selectedFile, this.selectedFile.name);
    } else {
      fd.append('photoUrl', this.photoUrl);
    }

    // waiting status:
    this.notWait = false;
    // call service
    this.studentService.update(this.student.id, fd)
    .subscribe(
      data => {
        this.alertify.success('Update ' + this.student.name + ' successfully');
        this.currentPageEmitter.emit(this.currentPage);
        this.notWait = true;
      },
      error => {
        this.alertify.error(error);
        this.notWait = true;
      }
    );
  }

  onFileChanged(event: any) {
    console.log(typeof(event));
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => this.photoUrl = e.target.result.toString();
      reader.readAsDataURL(event.target.files[0]);

      // Update form student
      this.selectedFile = event.target.files[0] as File;
    }
  }
}
